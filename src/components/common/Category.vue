<template>
    <div>
        <el-tabs v-model="activeIndex" @tab-click="handleClick"
                 :router="true">
            <el-tab-pane label="全部" name="0"></el-tab-pane>
            <template v-for="(category,i) in categoryData">
                <el-tab-pane :label="category.categoryName" :name="(i+1)+''" :category="category.categoryId">
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>


<script>

    export default {
        data() {
            return {
                activeIndex: '0',
                categoryData: [],
                categoryId: ''
            };
        },
        mounted() {
            this.getCategoryList();
        },
        methods: {
            getCategoryList() {
                this.axiosProxy.getCategoryList().then(response => {
                    this.categoryData = response.data;
                })
            },
            handleClick(tab, event) {
                this.categoryId = tab.$attrs.category;
                console.log(tab);
                this.$bus.emit('handleCate', this.categoryId)
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
