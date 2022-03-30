<template>
  <div class="model">
    <h1>Model Overview</h1>
    <dialog-component
      :show="!!error"
      :heading="error"
      @close="closeDialog"
    ></dialog-component>
    <card-component v-if="showContent">
      <div class="field">
        <p>Role Name</p>
        <div class="content-canvas">
          <h5 class="offcanvas-role" id="offcanvasLabel">
            <span>{{ role }}</span>
          </h5>
        </div>
      </div>
      <div class="field">
        <p>Privileges</p>
        <div class="content-canvas">
          <div class="offcanvas-body" tabindex="-1" aria-labelledby="offcanvasExampleLabel">
            <span>{{ privileges }}</span>
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
      let result = this.$store.getters["results/getResultById"](this.$route.params.id)[0];
      this.role = result.role;
      this.privileges = result.privileges;
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

<style scope>
.model h1 {
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
}
.content-canvas {
  display: flex;
  background: #eef6fb;
  border: 2px solid #d9e4f5;
  border-radius: 8px;
  align-self: stretch;
  justify-content: flex-start;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5%;
  margin-top: 4%;
}
span {
  padding-left: 3px;
  text-align: left!important;
  text-align-last: left!important;
}
</style>