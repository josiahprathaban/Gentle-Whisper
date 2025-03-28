<template>
  <v-footer
    height="40"
    app
    class="border-t"
  >
    <div class="d-flex flex-fill align-center justify-space-between">
      <v-btn
        class="px-0"
        flat
        icon="mdi-bookshelf"
        size="small"
        @click="goBack"
      />
      <div class="text-caption text-disabled d-flex align-center">
        &copy; {{ new Date().getFullYear() }}
        Gentle Whisper
      </div>
    </div>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      //
    };
  },
  computed: {
    //
  },
  created() {
    //
  },
  mounted() {
    //
  },
  methods: {
    goBack() {
      // this.$router.go(-1);
      this.$router.push("/");
    },
  },
};
</script>
