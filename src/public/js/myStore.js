var carID;
var deleteForm = document.forms['deleteCarForm'];
var pageSubmitForm = document.forms['pageSubmitForm'];
document.addEventListener('DOMContentLoaded', () => {
    $('#deleteModal').on('show.bs.modal', (event) => {
        var button = $(event.relatedTarget);
        carID = button.data('id');
    });
    const mainForm = $('form[name="main-form"]');
    const checkboxAll = $('#checkbox-all');
    const checkboxItems = $('input[name="carIds[]"]');
    const executeBtn = $('#execute-btn');
    const pageSelect = $('.page-item');
    pageSelect.click((e) => {
        // e.preventDefault();
        const page = e.target.getAttribute('data-value');
        var url = window.location.search;
        let submitUrl = '';
        url = url.replace('?', '');
        if (url == '') {
            submitUrl = `?page=${page}`;
        } else {
            if (url.includes(`&page=`)) {
                let indexPage = url.indexOf('&page=');
                let tempUrl = url.substr(0, indexPage);
                submitUrl = `?${tempUrl}&page=${page}`;
            } else if (url.includes('page=')) {
                submitUrl = `?page=${page}`;
            } else {
                submitUrl = `?${url}&page=${page}`;
            }
        }
        e.target.setAttribute('href', submitUrl);
    });
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
    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        var separator = uri.indexOf('?') !== -1 ? '&' : '?';
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + '=' + value + '$2');
        } else {
            return uri + separator + key + '=' + value;
        }
    }
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
