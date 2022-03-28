<template>
  <div class="model">
    <dialog-component
      :show="!!error"
      :heading="error"
      @close="closeDialog"
    ></dialog-component>
    <content-component v-if="showContent">
      <h1>Model Overview</h1>
      <div class="field">
        <p>Name</p>
        <div class="content-canvas">
          <h5 class="offcanvas-title" id="offcanvasLabel">
            <span>{{ title }}</span>
          </h5>
        </div>
      </div>
      <div class="field">
        <p>Description</p>
        <div class="content-canvas">
          <div class="offcanvas-title">
            <span>{{ description }}</span>
          </div>
        </div>
      </div>
    </content-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      description: null,
      error: null,
    };
  },
  created() {
    this.getModel();
  },
  methods: {
    async getModel() {
      try {
        await this.$store.dispatch("models/getModel", {
          id: this.$route.params.id,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      let model = this.$store.getters["models/getCurrentModel"];
      this.title = model.name;
      this.description = model.description;
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
h1 {
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 30px;
}
.content-canvas {
  display: flex;
  background: #eef6fb;
  border: 5px solid #d9e4f5;
  border-radius: 8px;
  align-self: stretch;
  justify-content: flex-start;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5%;
  margin-top: 6%;
}
</style>