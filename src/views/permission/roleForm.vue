<template>
  <div style="margin: 20px 20px">
    <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="save">保存</el-button>
  </div>
</template>
<script>
import menu from "@/api/system/menu";

export default {
  data() {
    return {
      saveBtnDisabled:false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleId:''

    };
  },
  // 监听器
  watch: {
    $route(to, from) {
      this.init()
    }
  },

  created () {
    this.init()
  },
  methods: {

    init(){
      if (this.$route.params && this.$route.params.id) {
          this.roleId = this.$route.params.id
          this.fetchDataById(this.roleId)
      } 
    },
    fetchDataById(roleId){
        let data = { roleId: roleId };
        menu.toAssign(data).then(response => {
            this.data = response.data.children
            var jsonList = JSON.parse(JSON.stringify(this.data))
            var list = []
            this.getJsonToList(list, jsonList[0]['children'])
            // console.log("最终集合")
            // console.log(list)
            this.setCheckedKeys(list)
        })
    },
    //把json数据转成string再转成对象，根据Key获取value数据
    getJsonToList(list, jsonList){
        //遍历这个集合对象，获取key的值
        for(var i = 0; i < jsonList.length; i++){
            if(jsonList[i]['select'] == true && jsonList[i]['level'] == 4){
                list.push(jsonList[i]['id'])
            }
            // if(jsonList[i]['select'] == true){
            //     list.push(jsonList[i]['id'])
            // }
            if(jsonList[i]['children'] != null){ 
              this.getJsonToList(list, jsonList[i]['children'])
            } 
        }
        
    },

    // getCheckedNodes() {
    //   console.log(this.$refs.tree.getCheckedNodes());
    // },
    // getCheckedKeys() {
    //   console.log(this.$refs.tree.getCheckedKeys());
    // },

    setCheckedKeys(list) {
      this.$refs.tree.setCheckedKeys(list);
    },

    save(){
      this.saveBtnDisabled = true
      
      //  var permissionIds = this.$refs.tree.getCheckedKeys().join(",");
      var ids = this.$refs.tree.getCheckedKeys();
       //获取子节点未全选时的父节点id
      let parentArr = this.$refs.tree.getHalfCheckedKeys();
      
      var permissionIds = parentArr.concat(ids).join(",");
      //vue elementUI tree树形控件获取父节点ID的实例
      //node_modules\element-ui\lib\element-ui.common.js
      let data = { roleId: this.roleId, permissionIds:permissionIds};
      menu.doAssign(data).then(response => {
          if(response.success){
              this.$message({
                type:'success',
                message:'保存成功'
              })
              this.$router.push({ path: '/permission/role' })
            }
      })
    }
  }
};
</script>
