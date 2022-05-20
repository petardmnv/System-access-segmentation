<template>
  <div class="model">
    <CardComponent>
      <div class="see-info">
        <ButtonComponent
          :message="'Info'"
          :path="getLink"
          :class="'btn btn-light btn-sm'"
          class="info-button"
        />
      </div>
      <h2>{{ title }}</h2>
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
    getLink() {
      return this.$route.path + "/" + this.id;
    },
    showBadge() {
      if (this.contentType === "none") {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
h2 {
  display: flex;
  margin: auto;
  padding: 2px;
  text-align: center;
}
h6 {
  text-align: start;
}
p {
  margin-top: 1rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
div .see-info {
  display: flex;
}
.see-info {
  position: absolute;
  top: 0.1em;
  right: 4px;
}
.privileges {
  margin-bottom: 20px;
}
.badge-class {
  display: flexbox;
  float: left;
}
</style>