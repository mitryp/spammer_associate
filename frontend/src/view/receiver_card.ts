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

    //<button class="btn btn-danger btn-sm float-right" onclick="removeReceiver(this)">Remove</button>
    const button = document.createElement('button');
    button.innerText = 'Remove';
    button.className = 'btn btn-danger btn-sm float-right';
    button.onclick = () => {
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
        button
    )

    return li;
}

