<template>
	<el-row>
		<el-col :offset="4" :span="16">
			<v-header></v-header>
			<div class="content-box">
				<div class="content">
					<transition mode="out-in" name="move">
						<router-view></router-view>
					</transition>
				</div>
			</div>
		</el-col>
	</el-row>
</template>


<script>
    import vHeader from './Header.vue';

    export default {
        components: {
            vHeader
        },
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
