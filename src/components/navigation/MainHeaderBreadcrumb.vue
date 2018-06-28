<template>
    <div class="breadcrumb-container">
        <b-breadcrumb :items="[]"/>
    </div>
</template>
<style lang="scss">
    @import '@styles/_bootstrap-variable-override.scss';
    .breadcrumb-container {
        display: flex;
        flex: 10 0 auto;
        align-items: center;
        justify-content: flex-start;
        ol {
            margin: 0;
        }
    }
</style>
