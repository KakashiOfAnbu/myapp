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
    const checkboxAll = $('#checkbox-all');
    const checkboxItems = $('input[name="carIds[]"]');
    const executeBtn = $('#execute-btn');
    checkboxAll.change(function () {
        checkboxItems.prop('checked', $(this).prop('checked'));
        renderExecuteBtn();
    });
    checkboxItems.change(function () {
        isCheckedAll =
            checkboxItems.length === $('input[name="carIds[]"]:checked').length;
        checkboxAll.prop('checked', isCheckedAll);
        renderExecuteBtn();
    });

    function renderExecuteBtn() {
        if ($('input[name="carIds[]"]:checked').length > 0) {
            executeBtn.attr('disabled', false);
        } else executeBtn.attr('disabled', true);
    }
});
const btnDeleteCar = document.querySelector('#btn-delete-car');
btnDeleteCar.onclick = () => {
    deleteForm.action = `/cars/${carID}/permanent?_method=DELETE`;
    deleteForm.submit();
};
