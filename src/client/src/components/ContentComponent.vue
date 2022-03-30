<template>
  <div class="model">
    <CardComponent>
      <header>
        <div class="see-info">
          <ButtonComponent
            :message="'Info'"
            :path="getModelLink"
            :class="'btn btn-light btn-sm'"
            class="info-button"
          />
        </div>
        <h2>{{ title }}</h2>
      </header>
      <h6>
        {{ description }}
      </h6>
      <div v-if="showBadge">
        <BadgeComponent class="content-desc" :type="contentType" :title="contentField"/>
      </div>
      <p v-else>
        {{ contentField }}
      </p>
    </CardComponent>
    <router-view></router-view>
  </div>
</template>

<script>
import CardComponent from "./CardComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import BadgeComponent from "./BadgeComponent.vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      requred: true,
    },
    content: {
      require: true,
      default: [],
    },
    description: {
      type: String,
      require: true,
    },
    contentType: {
      type: String,
      default: "none",
    },
  },
  components: { CardComponent, ButtonComponent, BadgeComponent },
  computed: {
    // Create user for model
    getModelLink() {
      return this.$route.path + "/" + this.id;
    },
    contentField() {
      return this.content.join(" ");
    },
    showBadge(){
      if (this.contentType === 'none') {
        return false
      }
      return true;
    } 
  },
};
</script>

<style scoped>
h6 {
  text-align: start;
}
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