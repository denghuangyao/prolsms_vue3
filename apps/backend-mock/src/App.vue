<script setup>
</script>
<template>
    <div class="container">
        <h1>Hello Vben Admin</h1>
        <h2>Mock service is starting</h2>
        <ul>
            <li><a href="/api/biobank/container/detail?id=1">/biobank/container/detail</a></li>
            <li><a href="/api/menu">/api/menu/all</a></li>
            <li><a href="/api/auth/codes">/api/auth/codes</a></li>
            <li><a href="/api/auth/login">/api/auth/login</a></li>
            <li><a href="/api/upload">/api/upload</a></li>
        </ul>
    </div>
</template>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

._link {
    font-size: 30px;
}

.box-card {
    width: 360px;
}

.el-space {
    align-items: flex-start !important;
}
</style>