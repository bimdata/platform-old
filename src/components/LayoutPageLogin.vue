<template>
    <div>
        <b-container fluid>
            <div id="login-layout" class="d-flex align-items-center justify-content-center">
                <b-row>
                    <b-col class="d-flex align-items-center justify-content-center">
                        <transition name="slide-fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>
