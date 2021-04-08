import { useRouter } from "next/router";

const UserPage = () => {
    const router = useRouter();
    const { emojiString } = router.query;

    return <p>emojiString: {emojiString}</p>;
};

export default UserPage;
