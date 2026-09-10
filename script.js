// ==========================================
// INKLY BLOG MANAGEMENT
// HTML + CSS + JAVASCRIPT
// ==========================================


// ==========================================
// STORAGE
// ==========================================

const STORAGE_KEY = "inkly_blog_posts";


// ==========================================
// DEFAULT ARTICLES
// ==========================================

const defaultPosts = [

    {
        id: "1",

        title:
            "The Web Is Becoming More Human",

        excerpt:
            "Why thoughtful interfaces matter as much as powerful technology.",

        category:
            "Technology",

        author:
            "Savalla Nikshitha",

        date:
            "2026-09-08",

        content:
            "Modern websites are no longer just collections of pages. They are experiences designed to help people understand, decide and act. Good web development combines technology with a clear understanding of people."
    },


    {
        id: "2",

        title:
            "Designing for Attention, Not Distraction",

        excerpt:
            "A practical approach to creating clean digital experiences.",

        category:
            "Design",

        author:
            "Savalla Nikshitha",

        date:
            "2026-09-06",

        content:
            "Good design removes friction. It creates hierarchy, gives content room to breathe and helps visitors find what matters. A clean interface can make complex information easier to understand."
    },


    {
        id: "3",

        title:
            "Starting Your Career in AI",

        excerpt:
            "Skills that students can build today for tomorrow's technology jobs.",

        category:
            "AI",

        author:
            "Savalla Nikshitha",

        date:
            "2026-09-03",

        content:
            "AI is changing software development, but strong fundamentals remain valuable. Students should learn programming, problem solving, databases, web development and how to build useful products."
    }

];



// ==========================================
// LOAD POSTS
// ==========================================

let posts =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );


if (!posts) {

    posts =
        defaultPosts;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(posts)
    );

}



// ==========================================
// GET ELEMENT
// ==========================================

const $ = (id) =>
    document.getElementById(id);



// ==========================================
// SAVE POSTS
// ==========================================

function savePosts() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(posts)
    );

}



// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return value.replace(
        /[&<>"']/g,
        function(character) {

            const entities = {

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#039;"

            };

            return entities[character];

        }
    );

}



// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(date) {

    return new Date(
        date + "T00:00"
    ).toLocaleDateString(
        undefined,
        {
            day: "2-digit",

            month: "short",

            year: "numeric"
        }
    );

}



// ==========================================
// DISPLAY POSTS
// ==========================================

function renderPosts() {


    const searchText =
        $("search")
            .value
            .toLowerCase()
            .trim();


    const selectedCategory =
        $("category").value;



    // Filter articles

    const filteredPosts =
        posts.filter(function(post) {


            const matchesSearch =

                !searchText ||

                post.title
                    .toLowerCase()
                    .includes(searchText)

                ||

                post.excerpt
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =

                selectedCategory === "all"

                ||

                post.category ===
                    selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });



    // Generate cards

    $("posts").innerHTML =
        filteredPosts
            .map(function(post) {


                return `

                    <article
                        class="post"
                        onclick="readPost('${post.id}')"
                    >

                        <div
                            class="post-image"
                        >

                            <span>
                                ${escapeHTML(
                                    post.category
                                )}
                            </span>

                        </div>


                        <div
                            class="post-body"
                        >

                            <div
                                class="post-meta"
                            >

                                ${formatDate(
                                    post.date
                                )}

                                •

                                ${escapeHTML(
                                    post.author
                                )}

                            </div>


                            <h3>

                                ${escapeHTML(
                                    post.title
                                )}

                            </h3>


                            <p>

                                ${escapeHTML(
                                    post.excerpt
                                )}

                            </p>


                            <div class="read">

                                READ STORY →

                            </div>

                        </div>

                    </article>

                `;

            })
            .join("");



    // Empty state

    $("noPosts")
        .classList
        .toggle(
            "hidden",
            filteredPosts.length > 0
        );

}



// ==========================================
// READ ARTICLE
// ==========================================

function readPost(id) {


    const post =
        posts.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!post) {
        return;
    }


    alert(

        post.title

        +

        "\n\n"

        +

        post.content

        +

        "\n\n— "

        +

        post.author

    );

}



// ==========================================
// OPEN AUTHOR STUDIO
// ==========================================

function openStudio() {

    $("adminModal")
        .classList
        .remove("hidden");


    resetForm();

    renderManageList();

}



// ==========================================
// CLOSE AUTHOR STUDIO
// ==========================================

function closeStudio() {

    $("adminModal")
        .classList
        .add("hidden");

}



// ==========================================
// RESET FORM
// ==========================================

function resetForm() {

    $("postId").value = "";

    $("postTitle").value = "";

    $("postExcerpt").value = "";

    $("postCategory").value =
        "Technology";

    $("postAuthor").value =
        "Savalla Nikshitha";

    $("postContent").value = "";

}



// ==========================================
// CREATE / UPDATE ARTICLE
// ==========================================

$("postForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();



            const id =
                $("postId").value;



            const articleData = {

                title:
                    $("postTitle")
                        .value
                        .trim(),

                excerpt:
                    $("postExcerpt")
                        .value
                        .trim(),

                category:
                    $("postCategory")
                        .value,

                author:
                    $("postAuthor")
                        .value
                        .trim(),

                content:
                    $("postContent")
                        .value
                        .trim(),

                date:
                    new Date()
                        .toISOString()
                        .slice(0, 10)

            };



            // UPDATE

            if (id) {


                const existingPost =
                    posts.find(
                        function(post) {

                            return post.id === id;

                        }
                    );


                if (existingPost) {

                    Object.assign(
                        existingPost,
                        articleData
                    );

                }

            }



            // CREATE

            else {


                posts.unshift({

                    id:
                        Date.now()
                            .toString(),

                    ...articleData

                });

            }



            savePosts();

            renderPosts();

            renderManageList();

            resetForm();


            alert(
                "Article saved and published successfully!"
            );

        }
    );



// ==========================================
// EDIT ARTICLE
// ==========================================

function editPost(id) {


    const post =
        posts.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!post) {
        return;
    }


    $("postId").value =
        post.id;


    $("postTitle").value =
        post.title;


    $("postExcerpt").value =
        post.excerpt;


    $("postCategory").value =
        post.category;


    $("postAuthor").value =
        post.author;


    $("postContent").value =
        post.content;


    // Scroll modal to top

    document
        .querySelector(".studio")
        .scrollTo({
            top: 0,
            behavior: "smooth"
        });

}



// ==========================================
// DELETE ARTICLE
// ==========================================

function deletePost(id) {


    const confirmed =
        confirm(
            "Are you sure you want to delete this article?"
        );


    if (!confirmed) {
        return;
    }


    posts =
        posts.filter(
            function(post) {

                return post.id !== id;

            }
        );


    savePosts();

    renderPosts();

    renderManageList();

}



// ==========================================
// MANAGEMENT LIST
// ==========================================

function renderManageList() {


    $("manageList").innerHTML =

        posts
            .map(function(post) {


                return `

                    <div
                        class="manage-row"
                    >

                        <span>

                            <b>
                                ${escapeHTML(
                                    post.title
                                )}
                            </b>

                            <small>
                                —
                                ${escapeHTML(
                                    post.category
                                )}
                            </small>

                        </span>


                        <span>

                            <button
                                onclick="editPost('${post.id}')"
                            >
                                Edit
                            </button>


                            <button
                                onclick="deletePost('${post.id}')"
                            >
                                Delete
                            </button>

                        </span>

                    </div>

                `;

            })
            .join("");

}



// ==========================================
// SEARCH
// ==========================================

$("search")
    .addEventListener(
        "input",
        renderPosts
    );



// ==========================================
// CATEGORY FILTER
// ==========================================

$("category")
    .addEventListener(
        "change",
        renderPosts
    );



// ==========================================
// OPEN STUDIO BUTTON
// ==========================================

$("adminOpen")
    .addEventListener(
        "click",
        openStudio
    );



// ==========================================
// CLOSE BUTTON
// ==========================================

$("closeAdmin")
    .addEventListener(
        "click",
        closeStudio
    );



// ==========================================
// NEW ARTICLE
// ==========================================

$("newPost")
    .addEventListener(
        "click",
        resetForm
    );



// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

$("adminModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target.id ===
                "adminModal"
            ) {

                closeStudio();

            }

        }
    );



// ==========================================
// INITIAL LOAD
// ==========================================

renderPosts();