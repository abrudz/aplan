# APL Array Notation sandbox

## Usage
### Online

* Go to [abrudz.github.io/aplan](https://abrudz.github.io/aplan).

### Offline

* Download Run.aplf

* If you have Dyalog 18.2 for Windows, right-click on the file and choose **Run with Dyalog**

* With any other system, enter `⍎⊃2⎕FIX'file://path/to/Run.aplf'` into your APL session.

* Start entering array notation. The system will detect when parentheses and brackets have been matched, indenting lines appropriately, and outputting the array when balanced. Enter a blank line or `→` to stop.

## Limitations
* Square brackets are always considered "broken", never as indexing or axis specification.
* Namespaces can only contain array members, no functions or operators.
* Scripted objects (`:Namespace` etc.) are not supported.
