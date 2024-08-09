<template>
    <footer class="footer">
        <span>Copyright <strong>Cod3r</strong> &copy; 2015-2018</span>
    </footer>
</template>
<script>
export default {
    name: 'FooterTemp'
}
</script>
<style scoped>
    .footer {
        grid-area: footer;
        background-color: #ddd;
        color: #333;

        display: flex; align-items: center; justify-content: flex-end;
        padding-right: 20px;
    }
</style>