<template>
  <div>
    <dialog-component :show="!!error" :heading="error" @close="closeDialog" />
    <h1>Priviledges Recommendation</h1>
    <div class="contentContainer">
      <div class="content">
        <div class="privileges">
          <h4 for="privileges">
            Choose which privileges your employee will need
          </h4>
          <h5 class="form-label">Privileges:</h5>

          <div class="form-check" v-for="priv in privileges" :key="priv">
            <label class="form-check-label" for="flexCheckChecked">
              {{ priv }}
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              :value="priv"
              id="flexCheckChecked"
              v-model="privilegesList"
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">
            Set role name for the choosen privileges
          </label>
          <input
            type="text"
            class="form-control"
            id="inputRole"
            v-model="roleName"
          />
        </div>
        <div class="btn-display">
          <button-component
            @click="saveData"
            :isBtn="true"
            message="Save"
            :btnClass="'btn btn-dark btn-lg'"
          >
          </button-component>
        </div>
      </div>
    </div>
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
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.privileges .role {
  display: flex;
  background: #eef6fb;
  border: 2px solid #d9e4f5;
  border-radius: 8px;
  align-self: stretch;
  justify-content: flex-start;
}

.form-check {
  display: inline;
  float: left;
  clear: left;
}
.form-check-input {
  text-align: left;
}

.form-check-label {
  text-align: left;
}

.form-label {
  margin-top: 13px !important;
  margin-bottom: 3px !important;
  float: left;
  clear: left;
}

.form-control {
  display: flex;
  background: #eef6fb;
  border: 2px solid #d9e4f5;
  border-radius: 8px;
  align-self: stretch;
  justify-content: flex-start;
}
.contentContainer {
  display: flex;
  border-radius: 12px;
  position: relative;
  justify-content: center;
  border: 2px solid black;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2.3rem;
  margin: 2rem auto;
  max-width: 50rem;
  max-height: 80rem;
  text-align: center;
}
</style>