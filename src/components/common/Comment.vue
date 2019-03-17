<template>
	<div class="itemWrap">
		<div style="padding: 5px 20px">
			<div>
				<p style="font-size: 16px; color: gray;">
					{{comment.content}}</p>
			</div>
			<div class="time">
				<router-link :to="{path: '/user/' + comment.id}">
					{{comment.userName}}
				</router-link>
				<span> 发表于{{comment.createTime}}</span>
			</div>
		</div>
		<hr>
	</div>
</template>

<script>
    export default {
        name: "comment",
        props: ['comment'],
    };
</script>

<style>
	p {
		margin: 0;
		width: 100%;
	}
	
	.itemWrap a {
		text-decoration: none;
		color: #000000;
	}
	
	.itemWrap {
		margin: 10px 0;
		background-color: #FFFFFF;
		border: 2px solid #CCCCCC
	}
	
	.time {
		float: right;
	}

</style>

