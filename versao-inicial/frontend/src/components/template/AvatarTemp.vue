<template>
    <div class="avatar"></div>
</template>
<script>
export default {
    name: 'AvatarTemp',
    props: {
        email: String
    }
}
</script>
<style scoped>
.avatar {
    border-radius: 5px;
    width: 40px; height: 40px;
    margin: 0; padding: 0;
    background: url(../../assets/default-avatar.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>