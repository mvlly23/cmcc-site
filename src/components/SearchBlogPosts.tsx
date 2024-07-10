import qs from "qs"; 

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
    let input = '';
    let posts: {};

    const searchPosts = async() => {
        console.log(input);
        let url = "https://blog.cmcc.ml/api/posts";
        const query = qs.stringify({
            sort: 'Title',
            populate: {
                author: {
                    fields: ['Name']
                }
            },
            filters: {
                $or: [
                    {
                        Title: {
                            $containsi: input
                        },
                    },
                    {
                        author: {
                            Name: {
                                $eq: input
                            }
                        },
                    },
                    {
                        Content: {
                            $containsi: input
                        }
                    }
                ],
                Visibility: {
                    $eq: true
                },
            }
        });

        posts = await fetch(url + "?" + query).then((response) => {
            return response.json();
        });
    }

    function updateInput({ target = {value: ''} }) {
        input = target.value;
    }

    return (
        <div className="flex justify-center items-center space-x-2">
            <Input type="text" className="px-3 py-2 w-80" placeholder="Search..." onChange={ updateInput } />
            <Button className="px-3 py-2" onClick={ searchPosts }>Search</Button>
        </div>
    );
}