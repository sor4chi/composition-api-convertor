export const LIFECYCLE_CHOICES = [
  { name: 'beforeCreate', convertingName: undefined },
  { name: 'created', convertingName: undefined },
  { name: 'beforeMount', convertingName: 'onBeforeMount' },
  { name: 'mounted', convertingName: 'onMounted' },
  { name: 'beforeUpdate', convertingName: 'onBeforeUpdate' },
  { name: 'updated', convertingName: 'onUpdated' },
  { name: 'beforeDestroy', convertingName: 'onBeforeUnmount' },
  { name: 'destroyed', convertingName: 'onUnmounted' },
  { name: 'errorCaptured', convertingName: 'onErrorCaptured' },
  { name: 'renderTracked', convertingName: 'onRenderTracked' },
  { name: 'renderTriggered', convertingName: 'onRenderTriggered' },
];
