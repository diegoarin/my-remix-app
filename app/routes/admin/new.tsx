import { useTransition, useActionData, ActionFunction, redirect, Form } from "remix";
import { createPost, NewPost } from "~/post";
import invariant from "tiny-invariant";

type PostError = {
    title: boolean;
    slug: boolean;
    markdown: boolean;
}
export let action: ActionFunction = async ({ request }) => {
    let formData = await request.formData();
  
    let title = formData.get("title") as string;
    let slug = formData.get("slug") as string;
    let markdown = formData.get("markdown") as string;

    let errors: Partial<PostError> = {};
    if (!title) errors.title = true;
    if (!slug) errors.slug = true;
    if (!markdown) errors.markdown = true;

    if (Object.keys(errors).length) {
        return errors;
    }

    invariant(typeof title === "string");
    invariant(typeof slug === "string");
    invariant(typeof markdown === "string");

    await createPost({ title, slug, markdown });
  
    return redirect("/admin");
};

export default function NewPost() {
    let errors = useActionData();
    let transition = useTransition();
    return (
        <Form method="post">
            <p>
                <label>
                    Post Title:{" "}
                    {errors?.title && <em>Title is required</em>}
                    <input type="text" name="title" />
                </label>
            </p>
            <p>
                <label>
                    Post Slug:{" "}
                    {errors?.slug && <em>Slug is required</em>}
                    <input type="text" name="slug" />
                </label>
            </p>
            <p>
                <label htmlFor="markdown">Markdown</label>{" "}
                {errors?.markdown && <em>Markdown is required</em>}
                <br />
                <textarea rows={20} name="markdown" className="full-width" />
            </p>
            <p>
                <button type="submit">
                    {transition.submission ? "Creating..." : "Create Post"}
                </button>
            </p>
        </Form>
    );
}
