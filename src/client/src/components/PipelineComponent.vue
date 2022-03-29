<template>
  <form @submit.prevent="submitForm" class="form-data">
    <div class="mb-3">
      <label class="form-label">Enter employee department</label>
      <input
        type="username"
        class="form-control"
        id="inputDepartment"
        v-model="department"
      />
    </div>
    <div class="mb-3">
      <label class="form-label">Enter employee job</label>
      <input
        type="username"
        class="form-control"
        id="inputJob"
        v-model="jopb"
      />
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label">Import IdM file</label>
      <input class="form-control" type="file" id="formFile" @change="uploadFile" />
    </div>
    <ButtonComponent
      :isBtn="true"
      btnClass="btn btn-dark btn-lg"
      :message="'Execute'"
    />
  </form>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue";
export default {
    data() {
        return {
            department: null,
            job: null,
            file: null
        };
    },
    components: { ButtonComponent },
    methods: {
        submitForm() {
            this.validateForm();
            // Check if form is valid
            if (!this.formIsValid) {
                return;
            }

            const formData = {

            };
            return this.$emit("export-data", formData);
        },
    }
};
</script>

<style scope>
form .mb-3 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 2rem !important;
}
.form-data .form-control {
  background: #eef6fb;
  border: 1px solid #d9e4f5;
  box-sizing: border-box;
  border-radius: 70px;
}
.form-data .form-control.invalid {
  border: 1px solid red;
}
</style>