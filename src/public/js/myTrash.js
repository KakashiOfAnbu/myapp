var carID;
var deleteForm = document.forms['delete-car-form'];
var restoreForm = document.forms['restore-car-form'];
var restoreBtns;
document.addEventListener('DOMContentLoaded', () => {
    restoreBtns = $('.btn-restore');
    restoreBtns.click((e) => {
        e.preventDefault();
        var restoreId = e.target.getAttribute('data-id');
        restoreForm.action = `/cars/${restoreId}/restore?_method=PATCH`;
        restoreForm.submit();
    });
    $('#deleteModal').on('show.bs.modal', (event) => {
        var button = $(event.relatedTarget);
        carID = button.data('id');
    });
});
const btnDeleteCar = document.querySelector('#btn-delete-car');
btnDeleteCar.onclick = () => {
    deleteForm.action = `/cars/${carID}/permanent?_method=DELETE`;
    deleteForm.submit();
};
