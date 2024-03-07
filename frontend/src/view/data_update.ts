import {ReceiverRepository} from "../application/repository/receiver_repository";
import {receiverCard} from "./receiver_card";

export function updateReceivers() {
    const ul = document.querySelector('#receivers');

    if (!ul) return;

    ReceiverRepository.getAll().then((receivers) => {
        ul.innerHTML = '';
        ul.append(...receivers.map((r) => receiverCard(r)));
    });
}

// let templates = [];
// export function updateMailTemplates() {
//
// }