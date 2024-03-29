import {updateReceivers} from "./view/data_update";
import {receiver} from "./data/model/receiver";
import {ReceiverRepository} from "./application/repository/receiver_repository";
import {template} from "./data/model/mail_template";
import Receiver = receiver.Receiver;
import MailTemplate = template.MailTemplate;
import ReceiverName = receiver.ReceiverName;
import UpdateReceiverDto = receiver.UpdateReceiverDto;

updateReceivers();

const addButton = document.querySelector<HTMLButtonElement>('#add_receiver_btn');
if (addButton) {
    addButton.onclick = () => {
        const form = document.forms.namedItem('receiverForm')!;

        if (!form.reportValidity()) {
            return;
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
}

const saveEditButton = document.querySelector<HTMLButtonElement>('#saveEditedButton');
if (saveEditButton) {
    saveEditButton.onclick = (e) => {
        e.preventDefault();

        const form = document.querySelector<HTMLFormElement>('#editReceiverForm');
        const email = form?.dataset['email'];

        if (!form || !form.reportValidity() || !email) {
            return;
        }

        const fd = new FormData(form);
        const middleName = fd.get('editMiddleName') as string;
        const dto: UpdateReceiverDto = {
            name: {
                firstName: fd.get('editFirstName') as string,
                middleName: middleName ? middleName : null,
                lastName: fd.get('editLastName') as string,
            }
        }

        ReceiverRepository.update(email, dto).then(() => updateReceivers()).catch(alert);
    }
}

const sendMailsButton = document.querySelector<HTMLButtonElement>('#send_emails');
if (sendMailsButton) {
    sendMailsButton.onclick = (e) => {
        e.preventDefault();

        const form = document.forms[0];

        if (!form.reportValidity()) {
            return;
        }

        const fd = new FormData(form);

        const newTemplate: MailTemplate = {
            title: fd.get('title') as string,
            body: fd.get('body') as string,
        };

        fetch('/mails/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTemplate),
        }).then(async (res) => {
            const emailsSent = await res.json().then((r) => r.emailsSent);
            alert(`Sent ${emailsSent} emails`);
        })
    }
}

