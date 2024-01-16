const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



function getAllPosts(req, res) {
    fs.readFile('posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read posts' });
        }

        const posts = JSON.parse(data);

        res.json(posts);
    });
}
  
  const getPostById = (req, res) => {
    const { id } = req.params;

    fs.readFile('posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read posts' });
        }

        const posts = JSON.parse(data);
        const post = posts.find((p) => p.id.toString() === id.toString());

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    });
};

const createPost = (req, res) => {
    const { title, content } = req.body;

    const newPost = {
        id: uuidv4(),
        title,
        content,
    };

    fs.readFile('posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save post' });
        }

        let posts = [];
        if (data) {
            posts = JSON.parse(data);
        }

        posts.push(newPost);

        fs.writeFile('posts.json', JSON.stringify(posts), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save post' });
            }

            res.json({ message: 'Post saved successfully' });
        });
    });
};
  
  const updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    fs.readFile('posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read posts' });
        }

        const posts = JSON.parse(data);
        const post = posts.find((p) => p.id === id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.title = title;
        post.content = content;

        fs.writeFile('posts.json', JSON.stringify(posts), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save post' });
            }

            res.json({ message: 'Post saved successfully' });
        });
    });
  };
  
  const deletePost = (req, res) => {
    const { id } = req.params;

    fs.readFile('posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read posts' });
        }

        const posts = JSON.parse(data);
        const postIndex = posts.findIndex((p) => p.id === id);

        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        posts.splice(postIndex, 1);

        fs.writeFile('posts.json', JSON.stringify(posts), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save post' });
            }

            res.json({ message: 'Post deleted successfully' });
        });
    });
  };
  
  module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  };
  