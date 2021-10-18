var carID;
var deleteForm = document.forms['deleteCarForm'];
document.addEventListener('DOMContentLoaded', () => {
    $('#deleteModal').on('show.bs.modal', (event) => {
        var button = $(event.relatedTarget);
        carID = button.data('id');
    });
    const checkboxAll = $('#checkbox-all');
    const mainForm = document.forms['main-form'];
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

    executeBtn.on('submit', function (e) {
        var isSubmitable = !$(this).hasClass('disabled');
        if (!isSubmitable) {
            e.preventDefault();
        }
    });
    function renderExecuteBtn() {
        if ($('input[name="carIds[]"]:checked').length > 0) {
            executeBtn.removeClass('disabled');
        } else executeBtn.addClass('disabled');
    }
});
const btnDeleteCar = document.querySelector('#btn-delete-car');
btnDeleteCar.onclick = () => {
    deleteForm.action = `/cars/${carID}/?_method=DELETE`;
    deleteForm.submit();
};
