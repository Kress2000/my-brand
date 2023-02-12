const blogSwagger = {

    /**
     * @swagger
     * components:
     *   schemas:
     *     blogs:
     *       type: object
     *       required:
     *         - title
     *         - category
     *         - description
     *         - img
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the blog
     *         title:
     *           type: string
     *           description: The title of your blog
     *         description:
     *           type: string
     *           description: The detils of your blog
     *         time:
     *           type: string
     *           format: date
     *           description: The date the blog was created
     *         img:
     *           type: string
     *           description: the image url
     *       example:
     *         id: d5fE_asz
     *         title: The avatar 3
     *         category: "Activities"
     *         description: "I was building it using blender"
     *         img: "https://github.com/Kress2000"
     *         time: 2023-02-10T04:05:06.157Z
     */
    
    /**
     * @swagger
     * tags:
     *   name: blogs
     *   description: The blogs managing API
     * /blogs/add:
     *   post:
     *     summary: Create a new book
     *     tags: [blogs]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/blogs'
     *     responses:
     *       200:
     *         description: The created book.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/blog'
     *       500:
     *         description: Some server error
     *
     */
}
module.exports = blogSwagger;