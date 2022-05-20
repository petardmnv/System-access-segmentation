<template>
  <div class="model">
    <h1>Result Overview</h1>
    <dialog-component
      :show="!!error"
      :heading="error"
      @close="closeDialog"
    ></dialog-component>
    <card-component v-if="showContent">
      <div class="content-wrapper">
        <div class="field">
          <p><b>Role Name</b></p>
          <h5 class="offcanvas-role" id="offcanvasLabel">
            <span>{{ role }}</span>
          </h5>
        </div>
        <div class="field">
          <p><b>Privileges</b></p>
          <div
            class="offcanvas-body"
            tabindex="-1"
            aria-labelledby="offcanvasExampleLabel"
          >
            <ul>
              <li v-for="p in privileges" :key="p">{{ p }}</li>
            </ul>
          </div>
        </div>
      </div>
    </card-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: null,
      privileges: null,
      error: null,
    };
  },
  created() {
    this.getResult();
  },
  methods: {
    async getResult() {
      try {
        let result = await this.$store.dispatch("results/getResult", {
          id: this.$route.params.id,
        });
        this.role = result.role;
        this.privileges = result.privileges;
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
    },
    closeDialog() {
      this.error = null;
    },
  },
  computed: {
    showContent() {
      let haveError = !!this.error;
      // I will return the oposite of haveError because I need true flag if there is no error
      return !haveError;
    },
  },
};
</script>

<style scoped>
.model h1 {
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5%;
}
ul {
  list-style-type: disc;
  display: flex;
  flex-direction: column;
}

li {
  text-align: left;
  float: left;
}
</style>