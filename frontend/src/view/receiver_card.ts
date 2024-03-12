import {receiver} from "../data/model/receiver";
import {ReceiverRepository} from "../application/repository/receiver_repository";
import {updateReceivers} from "./data_update";

const ns = receiver;

export function receiverCard(receiver: receiver.Receiver) {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    const emailLabel = document.createElement('strong');
    emailLabel.innerText = 'Email:';

    const nameLabel = document.createElement('strong');
    nameLabel.innerText = 'Name:';

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'btn btn-primary btn-sm float-right';
    editButton.onclick = () => {
        const modal = document.querySelector<HTMLDivElement>('#editReceiverModal');

        if (!modal) {
            console.error('Could not find the modal');
            return;
        }

        modal.classList.add('show');
        modal.style.display = 'block';
        const form = modal.querySelector<HTMLFormElement>('#editReceiverForm')!;
        form.dataset['email'] = receiver.email;
        document.querySelector<HTMLSpanElement>('#editReceiverModalLabel span')!.innerText = receiver.email;

        form.querySelector<HTMLInputElement>('#editFirstName')!.value = receiver.name.firstName;
        form.querySelector<HTMLInputElement>('#editMiddleName')!.value = receiver.name.middleName ?? "";
        form.querySelector<HTMLInputElement>('#editLastName')!.value = receiver.name.lastName;
    }

    //<button class="btn btn-danger btn-sm" onclick="removeReceiver(this)">Remove</button>
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'btn btn-danger btn-sm m-1';
    removeButton.onclick = () => {
        ReceiverRepository.delete(receiver.email).then((r) => {
            console.log(
                r ? `deleted ${receiver.email}` : 'could not delete'
            );
            updateReceivers();
        });
    }

    li.append(
        emailLabel, document.createTextNode(` ${receiver.email}`),
        document.createElement('br'),
        nameLabel, document.createTextNode(` ${ns.presentName(receiver.name)}`),
        document.createElement('br'),
        editButton,
        removeButton
    )

    return li;
}

