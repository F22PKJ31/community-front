<template>
	<el-col :span="6">
		<el-menu :default-active="activeIndex2" :router="true" @select="handleSelect"
		         active-text-color="#ffd04b" background-color="#777777"
		         class="el-menu-demo grid-content sidebar-el-category"
		         text-color="#fff">
			<!--<el-menu-item v-for="category in categoryData" :index="category.categoryId">{{category.categoryName}}</el-menu-item>-->
			<el-menu-item class="category-item" index="1">分类1</el-menu-item>
			<el-menu-item class="category-item" index="2">分类2</el-menu-item>
			<el-menu-item class="category-item" index="3">分类3</el-menu-item>
		</el-menu>
	</el-col>
</template>


<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                isLogin: false,
                categoryData: []
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
	.sidebar-el-category {
		margin-top: 50px;
		width: 220px;
	}
	
	.category-item {
		margin-top: 10px;
	}
</style>
