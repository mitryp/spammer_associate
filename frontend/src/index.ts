import {updateReceivers} from "./view/data_update";
import {receiver} from "./data/model/receiver";
import {ReceiverRepository} from "./application/repository/receiver_repository";
import Receiver = receiver.Receiver;

updateReceivers();

document.querySelector<HTMLButtonElement>('#add_receiver_btn')!.onclick = () => {
    console.log('click');
    const form = document.forms.namedItem('receiverForm')!;

    if (!form.reportValidity()) {
        console.log('from is invalid')
        return
    }

    const fd = new FormData(form);

    const newReceiver: Receiver = {
        email: fd.get('email') as string,
        name: {
            firstName: fd.get('firstName') as string,
            middleName: fd.get('middleName') as string,
            lastName: fd.get('lastName') as string,
        }
    };

    ReceiverRepository.create(newReceiver)
        .then(() => updateReceivers())
        .catch((err) => {
            alert(err);
        });

};

