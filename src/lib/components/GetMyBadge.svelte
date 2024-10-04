<div class="get-mine-modal">
    <input id="modal-toggle" type="checkbox">
    <label class="modal-btn" for="modal-toggle">Get mine</label>
    <label class="modal-backdrop" for="modal-toggle"></label>
    <div class="modal-content">
        <label class="modal-close" for="modal-toggle">&#x2715;</label>
        <p>Copy the code below:</p>
        <textarea><a href="https://yonei.dev"><img src="https://yonei.dev/web_badges/yonei.png" alt="Yonei's badge" /></a></textarea>
    </div>
</div>

<style lang="scss">
    .get-mine-modal {
        .modal-btn {
            border: 1px solid rgba(187, 211, 139, 0.2);
            border-radius: calc(var(--border-radius) - 5px);
            background-color: rgba(187, 211, 139, 0.2);
            transition: 0.1s;
            user-select: none;
            color: var(--text-color);
            display: flex;
            align-items: center;
            gap: 0.33rem;
            width: fit-content;
            font-size: 0.9rem;
            padding: 5px 8px;
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);

            &:hover {
                background-color: rgba(187, 211, 139, 0.4);
                cursor: pointer;
            }
        }

        .modal-content, .modal-backdrop {
            height: 0;
            width: 0;
            opacity: 0;
            visibility: hidden;
            overflow: hidden;
            cursor: pointer;
            transition: opacity 0.2s ease-in;
        }

        .modal-close {
            color: #aaa;
            position: absolute;
            right: 5px;
            top: 5px;
            padding-top: 3px;
            font-size: 16px;
            width: 25px;
            height: 25px;
            font-weight: bold;
            text-align: center;
            cursor: pointer;

            &:hover { color: #fff }
        }

        textarea {
            margin-top: 10px;
            width: 300px;
            height: 70px;

            @media only screen and (max-width: 400px) {
                & {
                    width: 200px;
                    height: 100px;
                }
            }
        }

        #modal-toggle {
            display: none;

            &.active ~ .modal-backdrop,
            &:checked ~ .modal-backdrop {
                background-color: rgba(0, 0, 0, 0.6);
                width: 100vw;
                height: 100vh;
                position: fixed;
                left: 0;
                top: 0;
                z-index: 9;
                visibility: visible;
                opacity: 1;
                transition: opacity 0.2s ease-in;
            }

            &.active ~ .modal-content,
            &:checked ~ .modal-content {
                width: fit-content;
                height: fit-content;
                position: fixed;
                top: 25%;
                left: 50%;
                transform: translate(-50%, -25%);
                z-index: 999;
                opacity: 1;
                padding: 25px;
                pointer-events: auto;
                cursor: auto;
                visibility: visible;

                background-color: #323235;
                border: 1px solid #454549;
                border-radius: calc(var(--border-radius) / 2);
                box-shadow: 0 3px 7px rgba(0, 0, 0, 0.6);
            }
        }
    }
</style>
