import React from 'react'

function useToggleVote({ id, isVoted, uid}) {
    const [isLoading, setIsLoading] = React.useState(false);

    async function toggleVote() {
        setIsLoading(true);
        const docRef = doc(db, 'Elections', id);
        await updateDoc(docRef, {
            isVoted: !isVoted,
            uid: uid
        });
  
}
return { toggleVote, isLoading };
}

export default useToggleVote