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
import { ExpertGroupsService } from '@/api/expertGroups';
import store from '@/store';
import * as MemberAct from '@/store/modules/member/actions.type';
import * as MemberMut from '@/store/modules/member/mutations.type';

export default {
  data: function () {
    const duplicate = (rule, value, callback) => {
      if (this.isDuplicateGroupName) {
        callback(new Error('既に存在するグループ名です'));
      }
      callback();
    };
    return {
      isFetchLoading: false,
      isSaveLoading: false,
      group: {
        id: '',
        name: '',
      },
      rules: {
        name: [{ validator: duplicate, trigger: 'change' }],
      },
    };
  },
  computed: {
    id: function () {
      return store.state.member.groupId;
    },
    isOpen: function () {
      return store.state.member.isOpenDialog.groupInfoSetting;
    },
    isDisabled: function () {
      return !this.group.name || this.isDuplicateGroupName;
    },
    isDuplicateGroupName: function () {
      return this.groups
        .filter((group) => group.id !== this.id)
        .map((group) => group.name)
        .includes(this.group.name);
    },
    groups: function () {
      return store.state.member.groups;
    },
  },
  methods: {
    fetchGroup: async function () {
      this.isFetchLoading = true;
      const { data } = await ExpertGroupsService.get.detail(this.id);
      this.group = data;
      this.isFetchLoading = false;
    },
    handleClose: function () {
      store.commit(MemberMut.TOGGLE_GROUP_INFO_SETTING_DIALOG, {
        isOpen: false,
      });
    },
    save: async function () {
      this.isSaveLoading = true;
      try {
        await ExpertGroupsService.put.groups(this.id, this.group);
        this.$notify.success({
          title: '完了',
          message: `グループ名を「${this.group.name}」に変更しました。`,
        });
      } catch (err) {
        this.$notify.error({
          title: '失敗',
          message:
            '更新に失敗しました。しばらく時間をおいてからもう一度お試しください。',
        });
        console.error(err);
      } finally {
        this.isSaveLoading = false;
        this.handleClose();
        store.dispatch(MemberAct.FETCH_MEMBERS);
        store.dispatch(MemberAct.FETCH_GROUPS);
      }
    },
  },
};
</script>

<style scoped>
.dialog >>> .el-dialog {
  min-width: 340px;
}
</style>
