<template>
    <div class="login__head-login text-center">
        <img class="login__logo" src="../../assets/images/logo-bimdata-carre.svg" width="100" height="100"/>
        <p class="login__baseline">{{ $t("login.baseline") }}</p>
    </div>
</template>
<style lang="scss">
    @import '@styles/_bootstrap-variable-override.scss';
    .login__head {
        margin-bottom: $grid-gutter-width * 2;
    }

    .login__logo {
        margin-bottom: 1.1143rem;
    }

    .login__baseline {
        font-size: 1rem;
        color: $primary;
    }
</style>
