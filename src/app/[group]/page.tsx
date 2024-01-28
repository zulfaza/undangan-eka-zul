import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from 'next/navigation'
import Home from "../page";
import { initGoogle } from "@/lib/google";

async function getData(groupId: string) {
    try {
        const docRef = doc(db, 'invitations', groupId)
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error("Data not found");
        }
        return docSnap.data()
    } catch (e) {
        console.log(e)
        notFound()
    }
}


export default async function HomeWithGroup({ params }: { params: { group: string } }) {
    const data = await getData(params.group);
    return Home({
        params: {
            group: params.group,
            groupName: data.groupName
        }
    })
}
