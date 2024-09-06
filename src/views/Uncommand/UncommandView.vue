<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">Open Dialog</el-button>
    <el-dialog
      title="Dialog Title"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <p>This is the content of the dialog.</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { ElDialog } from 'element-plus';
export default {
  setup() {
    const dialogVisible = ref(false)

    return {
      dialogVisible
    }
  }
}
</script>
