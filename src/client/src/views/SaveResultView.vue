<template>
  <div>
    <dialog-component :show="!!error" :heading="error" @close="closeDialog" />
    <card-component>
      <h1>Pipeline Model User Priviledges Recommendation</h1>
      <div class="privileges">
        <label for="privileges">
          Choose which privileges your employee will need</label
        >
        <!-- list of privileges -->
        <div class="form-check" v-for="priv in privileges" :key="priv">
          <input
            class="form-check-input"
            type="checkbox"
            :value="priv"
            id="flexCheckChecked"
            v-model="privilegesList"
          />
          <label class="form-check-label" for="flexCheckChecked">
            {{ priv }}
          </label>
        </div>
      </div>
      <div class="role">
        <label for="role"> Set role name for choosen privileges</label>
        <input type="text" v-model="roleName" />
      </div>
      <button-component
        @click="saveData"
        :isBtn="true"
        message="Save"
        :btnClass="'btn btn-dark btn-lg'"
      ></button-component>
    </card-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleName: null,
      privileges: null,
      privilegesList: [],
      error: null,
    };
  },
  methods: {
    getPrivileges() {
      this.privileges = this.$store.getters["results/getPrivileges"];
    },
    async saveData() {
      try {
        let privilegesFromProxy = [];
        for (let priv in this.privilegesList) {
          privilegesFromProxy.push(this.privilegesList[priv]);
        }
        let resultData = {
          role: this.roleName,
          privileges: privilegesFromProxy,
        };
        await this.$store.dispatch("results/addNewResult", {
          result: resultData,
        });
        this.$router.replace("/results");
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },
    closeDialog() {
      this.error = null;
    },
  },
  created() {
    this.getPrivileges();
  },
};
</script>

<style scoped>
h1 {
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
}
.privileges .role {
  display: flex;
  background: #eef6fb;
  border: 2px solid #d9e4f5;
  border-radius: 8px;
  align-self: stretch;
  justify-content: flex-start;
}
</style>