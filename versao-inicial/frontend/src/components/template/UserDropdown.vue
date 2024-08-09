<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="user"/>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user'])
}
</script>
<style scoped>
    .user-dropdown {
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
    }

    .user-dropdown-img {
        margin: 0 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px; border-radius: 5px;
    }
</style>