import { LoaderFunction, useLoaderData } from "remix";
import { getPost, MarkedPost } from "~/post";
import invariant from "tiny-invariant";

export let loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, "expected params.slug");
    return getPost(params.slug);
};

export default function PostSlug() {
    let post = useLoaderData<MarkedPost>();
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    );
}
