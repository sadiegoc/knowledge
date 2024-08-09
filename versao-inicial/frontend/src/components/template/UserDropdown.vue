<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <Avatar :email="user.email"/>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin">
                <i class="fa fa-cogs"></i>
                Administração
            </router-link>
            <a href=""><i class="fa fa-sign-out"></i>Sair</a>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Avatar from './AvatarTemp'

export default {
    name: 'UserDropdown',
    components: { Avatar },
    computed: mapState(['user'])
}
</script>
<style scoped>
    .user-dropdown {
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex; align-items: center;
        color: white; font-weight: 100;
        height: 100%;
        padding: 0 20px;
    }

    .user-button:hover {
        background-color: rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .user-dropdown-img {
        margin: 0 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px; border-radius: 5px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0;
        background: #f9f9f9;
        min-width: 170px;
        padding: 10px;

        display: flex; flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.2s linear;
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible; opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none; padding: 10px;
        color: #000;
    }

    .user-dropdown-content a:hover {
        text-decoration: none; background-color: #ededed;
        color: #000;
    }
</style>