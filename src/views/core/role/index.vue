<template>
  <UView name="角色管理" auth>
    <UViewSearch ref="ivzForm">
      <UInput label="角色名称" field="name" />
      <URadio label="状态" field="status" :options="status"/>
      <template #func>
        <UFuncBtn func="query" url="/core/role/view">搜索</UFuncBtn>
        <UFuncBtn func="reset">重置</UFuncBtn>
        <UFuncBtn func="add" url="/core/role/add">新增</UFuncBtn>
      </template>
    </UViewSearch>
    <UViewModal :span="[5, 16]" :rules="rules" title="角色管理">
      <UInput label="角色名称" field="name" />
      <URadio label="状态" field="status" :options="status" defaultValue="enabled"/>
      <UInputNumber label="排序" field="sort" :defaultValue="10"/>
      <UTextarea label="备注" field="remark" />
      <template #footer="{model}">
        <UFuncBtn func="cancel">取消</UFuncBtn>
        <UFuncBtn func="submit" :url="model.id ? '/core/role/edit' : '/core/role/add'">提交</UFuncBtn>
        <UFuncBtn func="reset">重置</UFuncBtn>
      </template>
    </UViewModal>
    <UViewTable :columns="columns" :scroll="{x: 800}">
      <template #c_action="{record}">
        <UFuncTag func="edit" :data="record" url="/core/role/edit">修改</UFuncTag>
        <UFuncTag func="del" :data="record" url="/core/role/del">删除</UFuncTag>
        <UFuncTag func="edit:set" eid="funcPerm" :data="record"
                  v-auth="'core:role:perm'" :config="{copy: ['id']}">分配权限</UFuncTag>
      </template>
    </UViewTable>
    <UFormDrawer uid="funcPerm" title="分配功能权限" placement="left" width="580">
      <template #default="{model}">
        &nbsp;<a-button @click="() => expanded('close')">折叠</a-button>
        &nbsp;<a-button type="primary" @click="() => expanded('open')">展开</a-button>
         <a-checkbox style="float: right" v-model:checked="checkedValue" @change="checked">全选</a-checkbox>
        <UTree url="/core/role/allMenus" :checkedUrl="getCheckedUrl(model)" :checkStrictly="false"
                 showLine checkable ref="funcMenus"/>
      </template>
      <template #footer>
        <UFuncBtn func="reset" @click="reset">重置</UFuncBtn>
        <UFuncBtn func="submit" url="/core/role/perm" @click="submit">提交</UFuncBtn>
        <UFuncBtn func="cancel">取消</UFuncBtn>
      </template>
    </UFormDrawer>
  </UView>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Role",
  setup() {
    let status = [
      {label: '启用', value: 'enabled'}, {label: '禁用', value: 'disabled'}
    ]
    let columns = [
      {field: 'name', title: '名称', width: 180},
      {field: 'status', title: '状态', options: status, width: 56},
      {field: 'sort', title: '排序', width: 56},
      {field: 'remark', title: '备注'},
      {field: 'createTime', title: '创建时间', type: 'datetime', picker: 'date', width: 160},
      {field: 'action', title: '操作', type: 'action', width: 230}
    ]
    let rules = {
      name: {required: true, message: '角色名称必填'}
    }

    let selectedUrl = ref('');
    let filterValue = ref('');
    let checkedValue = ref(false);

    return {columns, rules, status, selectedUrl, filterValue, checkedValue}
  },

  methods: {
    reset() {
      this.filterValue = '';
      this.checkedValue = false;
      let editContext = this.$view.getPrimaryEditContext("funcPerm");
      editContext.setLoading(true)
      let model = editContext.getModel();
      this.$refs['funcMenus'].loadingCheckedData(this.getCheckedUrl(model))
          .finally(() => editContext.setLoading(false));
    },
    getCheckedUrl(model) {
      // debugger
      let param = model.id ? `?id=${model.id}` : ''
      return '/core/role/func' + param;
    },
    submit() {
      let model = this.$view.getPrimaryEditContext("funcPerm").getModel();
      model['menuIds'] = this.$refs['funcMenus'].getCheckedKeys();
    },
    checked(e) {
      if(e.target.checked) {
        this.$refs['funcMenus'].setCheckedKeys();
      } else {
        this.$refs['funcMenus'].setCheckedKeys([]);
      }
    },
    expanded(type) {
      if(type == 'open') {
        this.$refs['funcMenus'].setExpandedKeys();
      } else {
        this.$refs['funcMenus'].setExpandedKeys([])
      }
    }
  }
}
</script>

<style scoped>

</style>
