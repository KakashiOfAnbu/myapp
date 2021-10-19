var carID;
var deleteForm = document.forms['deleteCarForm'];
document.addEventListener('DOMContentLoaded', () => {
    $('#deleteModal').on('show.bs.modal', (event) => {
        var button = $(event.relatedTarget);
        carID = button.data('id');
    });
    const mainForm = $('form[name="main-form"]');
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
    deleteForm.action = `/cars/${carID}/?_method=DELETE`;
    deleteForm.submit();
};
