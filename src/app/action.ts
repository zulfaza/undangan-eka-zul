'use server';

import { app, auth, db } from '@/lib/firebase';
import { initGoogle } from '@/lib/google';
import makeId from '@/lib/helper/makeId';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { revalidateTag } from 'next/cache';
import slugify from 'slugify';

export async function AddInvitation(_prevState: any, formData: FormData) {
  try {
    const requestId = formData.get('id') as string;
    const name = formData.get('name');
    const expected = (formData.get('expected') as string) ?? '0';
    const user_id = formData.get('uid');

    const id = requestId.length > 0 ? slugify(requestId) : makeId(5);

    await setDoc(doc(db, 'invitations', id), {
      groupName: name,
      expected: isNaN(parseInt(expected)) ? 0 : parseInt(expected),
      confirm: 0,
      user_id,
      date: Timestamp.now(),
    });

    return {
      message: 'Berhasil menambahkan undangan',
      success: true,
      error: false,
    };
  } catch (error) {
    let ErrorMessage = 'Terjadi Kesalahan, mohon coba lagi';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      console.log(error);
      ErrorMessage = error.message;
    }

    return {
      message: ErrorMessage,
      success: false,
      error: true,
    };
  }
}

export async function DeleteInvitation(_prevState: any, formData: FormData) {
  try {
    const id = formData.get('id') as string;
    if (!id) {
      throw new Error('Missing id');
    }

    await deleteDoc(doc(db, 'invitations', id));

    return {
      message: 'Berhasil menghapus',
      success: true,
      error: false,
    };
  } catch (error) {
    let ErrorMessage = 'Terjadi Kesalahan, mohon coba lagi';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      ErrorMessage = error.message;
    }

    return {
      message: ErrorMessage,
      success: false,
      error: true,
    };
  }
}

export async function submitInvitation(_prevState: any, formData: FormData) {
  try {
    const name = formData.get('name');
    const group = (formData.get('group') as string) ?? '-';
    const api = await initGoogle();

    if (!name) {
      throw {
        message: 'Nama tidak boleh kosong',
      };
    }

    const promises = [
      addDoc(collection(db, 'confirmations'), {
        name: name,
        group: group !== '-' ? group : null,
        date: Timestamp.now(),
      }),
      api.spreadsheets.values
        .append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: process.env.GOOGLE_SHEET_RANGE,
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          requestBody: {
            majorDimension: 'ROWS',
            values: [[new Date(), name, group]],
          },
        })
        .catch((err) => {
          console.log(err.message);
        }),
    ];

    if (group !== '-') {
      promises.push(
        updateDoc(doc(db, 'invitations', group), {
          confirm: increment(1),
        })
      );
    }

    await Promise.allSettled(promises);

    return {
      message: 'Terima kasih atas konfirmasinya, kami tunggu kedangannya :)',
      success: true,
      error: false,
    };
  } catch (error) {
    let ErrorMessage = 'Terjadi Kesalahan, mohon coba lagi';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      ErrorMessage = error.message;
    }

    return {
      message: ErrorMessage,
      success: false,
      error: true,
    };
  }
}

export async function submitWish(_prevState: any, formData: FormData) {
  try {
    const name = formData.get('name');
    const message = formData.get('message');

    if (!name || !message) {
      throw {
        message: 'Nama atau ucapan tidak boleh kosong',
      };
    }

    await addDoc(collection(db, 'wishes'), {
      name: name,
      message: message,
      date: Timestamp.now(),
    });

    revalidateTag('wish');

    return {
      message: 'Terima kasih atas ucapannya',
      error: false,
      success: true,
    };
  } catch (error) {
    let ErrorMessage = 'Terjadi Kesalahan, mohon coba lagi';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      ErrorMessage = error.message;
    }

    return {
      message: ErrorMessage,
      success: false,
      error: true,
    };
  }
}
