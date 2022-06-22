<template>
  <el-dialog
    title="グループ名の変更"
    :visible.sync="isOpen"
    width="40%"
    class="dialog"
    @open="fetchGroup"
    :before-close="handleClose"
  >
    <el-form v-loading="isFetchLoading" :rules="rules">
      <el-form-item prop="name" label="グループ名" label-width="100px">
        <el-input v-model="group.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">キャンセル</el-button>
      <el-button
        type="primary"
        @click="save"
        :disabled="isDisabled"
        :loading="isSaveLoading"
        >保存</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, reactive, computed } from '@vue/composition-api';
import { ExpertGroupsService } from '@/api/expertGroups';
import store from '@/store';
import * as MemberAct from '@/store/modules/member/actions.type';
import * as MemberMut from '@/store/modules/member/mutations.type';

const isFetchLoading = ref(false);
const isSaveLoading = ref(false);
const group = reactive({
  id: '',
  name: '',
});
const rules = reactive({
  name: [{ validator: duplicate, trigger: 'change' }],
});
const id = computed(() => {
  return store.state.member.groupId;
});
const isOpen = computed(() => {
  return store.state.member.isOpenDialog.groupInfoSetting;
});
const isDisabled = computed(() => {
  return !group.value.name || isDuplicateGroupName.value;
});
const isDuplicateGroupName = computed(() => {
  return groups.value
    .filter((group) => group.id !== id.value)
    .map((group) => group.name)
    .includes(group.value.name);
});
const groups = computed(() => {
  return store.state.member.groups;
});
const fetchGroup = async () => {
  isFetchLoading.value = true;
  const { data } = await ExpertGroupsService.get.detail(id.value);
  group.value = data;
  isFetchLoading.value = false;
};
const handleClose = () => {
  store.commit(MemberMut.TOGGLE_GROUP_INFO_SETTING_DIALOG, {
    isOpen: false,
  });
};
const save = async () => {
  isSaveLoading.value = true;
  try {
    await ExpertGroupsService.put.groups(id.value, group.value);
    root.$notify.success({
      title: '完了',
      message: `グループ名を「${group.value.name}」に変更しました。`,
    });
  } catch (err) {
    root.$notify.error({
      title: '失敗',
      message:
        '更新に失敗しました。しばらく時間をおいてからもう一度お試しください。',
    });
    console.error(err);
  } finally {
    isSaveLoading.value = false;
    handleClose();
    store.dispatch(MemberAct.FETCH_MEMBERS);
    store.dispatch(MemberAct.FETCH_GROUPS);
  }
};
</script>

<style scoped>
.dialog >>> .el-dialog {
  min-width: 340px;
}
</style>
