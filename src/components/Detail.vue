<template>
  <div>
    <p>Detail</p>
    <p>{{project}}</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    project: String
  }
}
</script>
