var blogHost = 'http://127.0.0.1:8011';
var newsHost = 'http://127.0.0.1:8012';
var postHost = 'http://127.0.0.1:8013';
var userHost = 'http://127.0.0.1:8014';
var categoryHost = 'http://127.0.0.1:8015';

export default {
    getBlogList: {url: blogHost + '/blog/blogList'}    //获取博客列表
    , getBlogListOrderByRead: {url: blogHost + '/blog/blogListOrderByRead'}    //获取博客列表
    , getBlogCollectionList: {url: blogHost + '/blog/collectionListByUserId'}        //获取博客收藏列表
    , deleteBlogCollection: {url: blogHost + '/blog/deleteCollection'}                       //删除博客收藏
    , getBlogCommentList: {url: blogHost + '/blog/commentList'}
    , getBlogById: {url: blogHost + '/blog/blogDetail'}//获取角色
    , sendBlogComment: {url: blogHost + '/blog/sendComment'}//获取角色
    , deleteBlogComment: {url: blogHost + '/blog/deleteComment'}
    , deleteBlog: {url: blogHost + '/blog/deleteBlog'}
    , countBlogComment: {url: blogHost + '/blog/countComment'}

    , updateNews: {url: newsHost + '/news/updateNews'}
    , deleteNews: {url: newsHost + '/news/deleteNews'}
    , getNewsList: {url: newsHost + '/news/newsList'}
    , sendNewsComment: {url: newsHost + '/news/sendComment'}//获取角色
    , getNewsCommentList: {url: newsHost + '/news/commentList'}
    , getNewsCollectionList: {url: newsHost + '/news/collectionListByUserId'}        //获取博客收藏列表
    , deleteNewsCollection: {url: newsHost + '/news/deleteCollection'}
    , getNewsById: {url: newsHost + '/news/newsDetail'}
    , deleteNewsComment: {url: newsHost + '/news/deleteComment'}
    , countNewsComment: {url: newsHost + '/news/countComment'}

    , updatePost: {url: postHost + '/post/updatePost'}
    , sendPost: {url: postHost + '/post/sendPost'}
    , deletePost: {url: postHost + '/post/deletePost'}
    , sendPostComment: {url: postHost + '/post/sendComment'}//获取角色
    , getPostCollectionList: {url: postHost + '/post/collectionListByUserId'}        //获取博客收藏列表
    , deletePostCollection: {url: postHost + '/post/deleteCollection'}
    , getPostList: {url: postHost + '/post/postList'}
    , getPostListOrderByRead: {url: postHost + '/post/postListOrderByRead'}
    , getPostById: {url: postHost + '/post/postDetail'}
    , getPostCommentList: {url: postHost + '/post/commentList'}
    , deletePostComment: {url: postHost + '/post/deleteComment'}
    , countPostComment: {url: postHost + '/post/countComment'}

    , addUser: {url: userHost + '/user/addUser'}
    , updateUser: {url: userHost + '/user/updateUser'}
    , deleteUser: {url: userHost + '/user/deleteUser'}
    , getUserList: {url: userHost + '/user/userList'}
    , getUser: {url: userHost + '/user/getUser'}
    , getUserByName: {url: userHost + '/user/getUserByName'}

    , getCategoryList: {url: categoryHost + '/category/categoryList'}
    , getCategoryListByPage: {url: categoryHost + '/category/categoryListByPage'}
    , addCategory: {url: categoryHost + '/category/addCategory'}
    , updateBlog: {url: blogHost + '/blog/updateBlog'}
    , sendBlog: {url: blogHost + '/blog/sendBlog'}
    , updateCategory: {url: categoryHost + '/category/updateCategory'}
    , deleteCategory: {url: categoryHost + '/category/deleteCategory'}

    , saveNewsCollection: {url: newsHost + '/news/saveCollection'}
    , savePostCollection: {url: postHost + '/post/saveCollection'}
    , saveBlogCollection: {url: blogHost + '/blog/saveCollection'}
    , headImgList: {url: newsHost + '/news/headImgList'}
    // , deleteComment: {url: blogHost + '/blog/deleteComment'}
}
