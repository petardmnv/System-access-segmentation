<template>
  <div class="model">
    <ContentComponent>
      <header>
        <div class="see-info">
          <ButtonComponent
            :message="'Info'"
            :path="getModelLink"
            :class="'btn btn-light btn-sm'"
            class="info-button"
          />
        </div>
        <h2>{{ modelName }}</h2>
      </header>
      <p>
        {{ modelDescription }}
      </p>
    </ContentComponent>
    <router-view></router-view>
  </div>
</template>

<script>
import ContentComponent from "./ContentComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      requred: true,
    },
    modelDescription: {
      type: String,
      require: true,
    },
  },
  components: { ContentComponent, ButtonComponent },
  computed: {
    // Create user for model
    getModelLink() {
      return this.$route.path + "/" + this.id;
    },
  },
};
</script>

<style scoped>
p {
  margin-top: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
header {
  position: relative;
  align-content: space-between;
}
div .see-info {
  display: inline-block;
}
header .see-info {
  position: absolute;
  right: 0;
}
</style>